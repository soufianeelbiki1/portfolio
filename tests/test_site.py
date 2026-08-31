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

    def test_required_case_study_sections_exist(self) -> None:
        self.assertTrue(
            {"main", "top", "work", "analytics", "roles", "principles"} <= self.parser.ids
        )

    def test_all_cv_flagship_repositories_are_linked(self) -> None:
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

    def test_engineering_claim_boundaries_are_present(self) -> None:
        lowered = self.html.lower()
        self.assertIn("engineering simulation", lowered)
        self.assertIn("at-least-once", lowered)
        self.assertIn("iso 8583 → canonical → iso 20022", lowered)
        self.assertIn("fail-closed", lowered)
        self.assertIn("measured semantic/vector retrieval remains future work", lowered)
        self.assertIn("no icao certification", lowered)

    def test_analytics_projects_are_present_as_implemented_work(self) -> None:
        self.assertIn("Three dedicated analytics flagships are now implemented", self.html)
        self.assertIn("AtlasAnalytics", self.html)
        self.assertIn("ExperimentLab", self.html)
        self.assertIn("RetailIntel", self.html)
        self.assertIn("Sample Ratio Mismatch", self.html)
        self.assertIn("minimum-detectable-effect", self.html)
        self.assertIn("cost-optimal threshold selection", self.html)
        self.assertIn("PSI distribution monitoring", self.html)
        self.assertIn("Dense SKU × calendar-day demand spine", self.html)
        self.assertIn("95% service-level assumption", self.html)

    def test_data_hiring_lenses_are_present(self) -> None:
        self.assertIn("Data Analyst", self.html)
        self.assertIn("Analytics Engineer", self.html)
        self.assertIn("Data Scientist", self.html)
        self.assertIn("Product Analytics", self.html)
        self.assertIn("Commercial Analytics", self.html)

    def test_synthetic_and_causal_boundaries_are_visible(self) -> None:
        lowered = self.html.lower()
        self.assertIn("synthetic data", lowered)
        self.assertIn("promotion analysis is descriptive, not causal", lowered)
        self.assertIn("no production fraud-loss", lowered)
        self.assertIn("statistical significance is separated from business impact", lowered)

    def test_no_placeholder_or_unverified_demo_links(self) -> None:
        lowered = self.html.lower()
        for forbidden in ("lorem ipsum", "example.com", "localhost", 'href="#"'):
            self.assertNotIn(forbidden, lowered)


if __name__ == "__main__":
    unittest.main()
