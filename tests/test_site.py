from html.parser import HTMLParser
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"


class SiteParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: set[str] = set()
        self.links: list[str] = []
        self.stylesheets: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if values.get("id"):
            self.ids.add(values["id"] or "")
        if tag == "a" and values.get("href"):
            self.links.append(values["href"] or "")
        if tag == "link" and values.get("rel") == "stylesheet" and values.get("href"):
            self.stylesheets.append(values["href"] or "")


class ProjectSiteTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.html = INDEX.read_text(encoding="utf-8")
        cls.parser = SiteParser()
        cls.parser.feed(cls.html)

    def test_main_sections_exist(self) -> None:
        self.assertTrue({"top", "systems", "demos", "projects"} <= self.parser.ids)

    def test_project_repositories_are_linked(self) -> None:
        expected = {
            "https://github.com/soufianeelbiki1/AtlasPay",
            "https://github.com/soufianeelbiki1/AtlasAnalytics",
            "https://github.com/soufianeelbiki1/ExperimentLab",
            "https://github.com/soufianeelbiki1/RetailIntel",
            "https://github.com/soufianeelbiki1/AtlasRAG",
            "https://github.com/soufianeelbiki1/ForecastLab",
            "https://github.com/soufianeelbiki1/Nexus",
        }
        self.assertTrue(expected <= set(self.parser.links))

    def test_stylesheet_and_browser_demos_exist(self) -> None:
        self.assertIn("/styles.css", self.parser.stylesheets)
        self.assertTrue((ROOT / "styles.css").is_file())
        for path in (
            ROOT / "demos" / "atlasanalytics-risk.html",
            ROOT / "demos" / "experimentlab.html",
        ):
            self.assertTrue(path.is_file())

    def test_live_demo_links_are_present(self) -> None:
        self.assertIn("/demos/atlasanalytics-risk.html", self.parser.links)
        self.assertIn("/demos/experimentlab.html", self.parser.links)

    def test_core_technical_topics_are_present(self) -> None:
        lowered = self.html.lower()
        for expected in (
            "iso 8583",
            "double-entry",
            "transactional outbox",
            "sample ratio mismatch",
            "psi monitoring",
            "safety stock",
            "citation-aware",
            "runtime contract validation",
        ):
            self.assertIn(expected, lowered)

    def test_scope_notes_are_present(self) -> None:
        lowered = self.html.lower()
        self.assertIn("payment simulation", lowered)
        self.assertIn("semantic/vector retrieval is still planned", lowered)
        self.assertIn("raw-image inference", lowered)
        self.assertIn("promotion comparisons remain descriptive rather than causal", lowered)
        self.assertIn("synthetic data", lowered)

    def test_old_meta_language_does_not_return(self) -> None:
        lowered = self.html.lower()
        for forbidden in (
            "flagship",
            "portfolio signal",
            "hiring evidence",
            "cv-ready",
            "claim boundary",
            "truth boundary",
            "next highest-value",
            "operating brief",
            "project_context",
        ):
            self.assertNotIn(forbidden, lowered)

    def test_no_placeholder_or_local_links(self) -> None:
        lowered = self.html.lower()
        for forbidden in ("lorem ipsum", "example.com", "localhost", 'href="#"'):
            self.assertNotIn(forbidden, lowered)

    def test_demo_pages_keep_scope_boundaries(self) -> None:
        risk = (ROOT / "demos" / "atlasanalytics-risk.html").read_text(encoding="utf-8").lower()
        experiment = (ROOT / "demos" / "experimentlab.html").read_text(encoding="utf-8").lower()
        self.assertIn("not a deployed fraud model", risk)
        self.assertIn("not a production loss estimate", risk)
        self.assertIn("not production results", experiment)
        self.assertIn("deterministically generated", experiment)


if __name__ == "__main__":
    unittest.main()
