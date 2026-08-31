from html.parser import HTMLParser
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"


class PortfolioParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: set[str] = set()
        self.links: list[str] = []
        self.stylesheets: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        element_id = values.get("id")
        if element_id:
            self.ids.add(element_id)
        if tag == "a" and values.get("href"):
            self.links.append(values["href"] or "")
        if tag == "link" and values.get("rel") == "stylesheet" and values.get("href"):
            self.stylesheets.append(values["href"] or "")


class PortfolioSiteTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.html = INDEX.read_text(encoding="utf-8")
        cls.parser = PortfolioParser()
        cls.parser.feed(cls.html)

    def test_required_sections_exist(self) -> None:
        self.assertTrue({"main", "top", "work", "analytics", "about"} <= self.parser.ids)

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

    def test_local_stylesheet_exists(self) -> None:
        self.assertIn("styles.css", self.parser.stylesheets)
        self.assertTrue((ROOT / "styles.css").is_file())

    def test_core_technical_topics_are_present(self) -> None:
        lowered = self.html.lower()
        for expected in (
            "iso 8583",
            "double-entry",
            "transactional outbox",
            "sample ratio mismatch",
            "cuped",
            "psi monitoring",
            "safety stock",
            "citation-aware",
            "runtime contract validation",
        ):
            self.assertIn(expected, lowered)

    def test_scope_notes_are_present(self) -> None:
        lowered = self.html.lower()
        self.assertIn("does not connect to a live card network", lowered)
        self.assertIn("semantic/vector retrieval is still planned", lowered)
        self.assertIn("raw-image inference", lowered)
        self.assertIn("promotion comparisons are descriptive rather than causal", lowered)
        self.assertIn("generated data", lowered)

    def test_meta_portfolio_language_does_not_return(self) -> None:
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
        ):
            self.assertNotIn(forbidden, lowered)

    def test_no_placeholder_or_local_links(self) -> None:
        lowered = self.html.lower()
        for forbidden in ("lorem ipsum", "example.com", "localhost", 'href="#"'):
            self.assertNotIn(forbidden, lowered)


if __name__ == "__main__":
    unittest.main()
