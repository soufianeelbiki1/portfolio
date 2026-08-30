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
        self.assertTrue({"main", "top", "work", "roles", "principles"} <= self.parser.ids)

    def test_all_flagship_repositories_are_linked(self) -> None:
        expected = {
            "https://github.com/soufianeelbiki1/AtlasPay",
            "https://github.com/soufianeelbiki1/AtlasRAG",
            "https://github.com/soufianeelbiki1/ForecastLab",
            "https://github.com/soufianeelbiki1/Nexus",
        }
        self.assertTrue(expected <= set(self.parser.links))

    def test_local_stylesheet_exists(self) -> None:
        self.assertIn("styles.css", self.parser.stylesheets)
        self.assertTrue((ROOT / "styles.css").is_file())

    def test_project_statuses_match_verified_evidence_boundaries(self) -> None:
        self.assertIn(
            "Status: operator foundation implemented; fixture-backed, not live telemetry.",
            self.html,
        )
        self.assertIn(
            "Status: evaluator and quality-policy foundations implemented; no real-world accuracy or certification claim.",
            self.html,
        )
        self.assertIn("Issuer/acquirer routing with deterministic longest-prefix selection", self.html)
        self.assertIn("Strict DE55 BER-TLV parsing", self.html)
        self.assertIn("durable ingestion, hybrid rank fusion/reranking, and application-level RAG regression metrics implemented", self.html)
        self.assertIn("timeout→reversal lifecycle", self.html)
        self.assertIn("ISO 8583 → canonical → ISO 20022", self.html)
        self.assertIn("read-only reconciliation and outbox checks", self.html)
        self.assertIn("FastAPI precomputed-signal evaluation", self.html)

    def test_no_placeholder_or_unverified_demo_links(self) -> None:
        lowered = self.html.lower()
        for forbidden in ("lorem ipsum", "example.com", "localhost", "href=\"#\""):
            self.assertNotIn(forbidden, lowered)


if __name__ == "__main__":
    unittest.main()
