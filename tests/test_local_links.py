"""Offline navigation checks; these do not prove public/browser availability."""

from html.parser import HTMLParser
from pathlib import Path
from tempfile import TemporaryDirectory
from urllib.parse import unquote, urlsplit
import unittest


class ReferenceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.references: list[str] = []
        self.ids: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if values.get("id"):
            self.ids.append(values["id"] or "")
        attribute = {"a": "href", "link": "href", "script": "src", "img": "src"}.get(tag)
        if attribute and attribute in values:
            self.references.append(values[attribute] or "")


def local_reference_errors(root: Path) -> list[str]:
    root = root.resolve()
    errors: list[str] = []
    parsed: dict[Path, ReferenceParser] = {}

    def parse(path: Path) -> ReferenceParser:
        if path not in parsed:
            parser = ReferenceParser()
            parser.feed(path.read_text(encoding="utf-8"))
            parsed[path] = parser
        return parsed[path]

    for page in sorted(root.rglob("*.html")):
        source = str(page.relative_to(root))
        parser = parse(page)
        duplicates = sorted({item for item in parser.ids if parser.ids.count(item) > 1})
        if duplicates:
            errors.append(f"{source}: duplicate IDs {duplicates}")
        for reference in parser.references:
            if reference in ("", "#"):
                errors.append(f"{source}: empty reference {reference!r}")
                continue
            url = urlsplit(reference)
            # External links are intentionally not fetched: no credentials,
            # hosted services, quota consumption, or availability claims.
            if url.scheme or url.netloc:
                continue
            path = unquote(url.path)
            target = (root / path.lstrip("/") if path.startswith("/") else page.parent / path).resolve() if path else page
            if not target.is_relative_to(root):
                errors.append(f"{source}: reference escapes site root: {reference}")
                continue
            if target.is_dir():
                target = target / "index.html"
            if not target.is_file():
                errors.append(f"{source}: missing target: {reference}")
                continue
            if url.fragment and target.suffix == ".html":
                fragment = unquote(url.fragment)
                if fragment not in parse(target).ids:
                    errors.append(f"{source}: missing anchor: {reference}")
    return errors


class PublishedSourceNavigationTests(unittest.TestCase):
    def test_every_html_page_has_resolvable_local_navigation_and_assets(self) -> None:
        errors = local_reference_errors(Path(__file__).resolve().parents[1])
        self.assertEqual([], errors, "\n".join(errors))


class NavigationValidatorTests(unittest.TestCase):
    def setUp(self) -> None:
        self.directory = TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        (self.root / "demos").mkdir()
        (self.root / "styles.css").write_text("body {}", encoding="utf-8")
        (self.root / "index.html").write_text(
            '<main id="demos"><a href="/demos/report.html#results">Report</a></main>',
            encoding="utf-8",
        )
        (self.root / "demos/report.html").write_text(
            '<link rel="stylesheet" href="/styles.css"><h1 id="results">Report</h1>'
            '<a href="/#demos">Home</a><a href="../index.html?view=1#demos">Relative</a>'
            '<a href="https://invalid.example/report#unknown">External</a>'
            '<a href="mailto:person@invalid.example">Email</a>',
            encoding="utf-8",
        )

    def add_reference(self, markup: str) -> list[str]:
        page = self.root / "demos/report.html"
        page.write_text(page.read_text(encoding="utf-8") + markup, encoding="utf-8")
        return local_reference_errors(self.root)

    def test_root_relative_and_cross_page_anchors_resolve_offline(self) -> None:
        self.assertEqual([], local_reference_errors(self.root))

    def test_missing_page_is_detected(self) -> None:
        self.assertTrue(any("missing target" in error for error in self.add_reference('<a href="lost.html">Lost</a>')))

    def test_missing_cross_page_anchor_is_detected(self) -> None:
        self.assertTrue(any("missing anchor" in error for error in self.add_reference('<a href="/#missing">Lost</a>')))

    def test_missing_script_and_image_are_detected(self) -> None:
        errors = self.add_reference('<script src="/missing.js"></script><img src="missing.png">')
        self.assertEqual(2, len(errors))
        self.assertTrue(all("missing target" in error for error in errors))

    def test_percent_encoded_traversal_is_rejected(self) -> None:
        self.assertTrue(any("escapes site root" in error for error in self.add_reference('<a href="/%2e%2e/private.html">Outside</a>')))

    def test_duplicate_ids_and_placeholder_links_are_detected(self) -> None:
        errors = self.add_reference('<h2 id="results">Duplicate</h2><a href="#">Placeholder</a>')
        self.assertTrue(any("duplicate IDs" in error for error in errors))
        self.assertTrue(any("empty reference" in error for error in errors))


if __name__ == "__main__":
    unittest.main()
