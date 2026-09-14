from html.parser import HTMLParser
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


class PresentationParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: set[str] = set()
        self.links: list[str] = []
        self.labelled_sections: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if values.get("id"):
            self.ids.add(values["id"] or "")
        if tag == "a" and values.get("href"):
            self.links.append(values["href"] or "")
        if tag == "section" and values.get("aria-labelledby"):
            self.labelled_sections.append(values["aria-labelledby"] or "")


class PresentationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.html = (ROOT / "index.html").read_text(encoding="utf-8")
        cls.parser = PresentationParser()
        cls.parser.feed(cls.html)

    def test_java_boundary_is_visible_without_recasting_the_python_system(self) -> None:
        self.assertIn("Java 21 / Spring Boot authorization boundary", self.html)
        self.assertIn("FastAPI payment simulation", self.html)
        self.assertIn('<span class="chip">Java 21</span>', self.html)
        self.assertIn('<span class="chip">Spring Boot</span>', self.html)

    def test_all_fixed_report_cards_are_identified_as_static(self) -> None:
        self.assertEqual(6, self.html.count('<span class="status">STATIC</span>'))
        self.assertNotIn('<span class="status">LIVE</span>', self.html)
        self.assertIn("fixed HTML snapshots, not live backend sessions", self.html)
        self.assertNotIn('<span>Integration CI</span><strong>Green</strong>', self.html)

    def test_email_contact_has_named_section_and_direct_non_form_path(self) -> None:
        self.assertIn("#contact", self.parser.links)
        self.assertIn("contact", self.parser.ids)
        self.assertIn("contact-heading", self.parser.labelled_sections)
        self.assertIn("contact-heading", self.parser.ids)
        self.assertIn("mailto:elbikisoufiane@gmail.com", self.parser.links)
        self.assertNotIn("<form", self.html.lower())

    def test_evidence_decision_label_is_consistent_across_report_and_index(self) -> None:
        report = (ROOT / "demos/atlasrag.html").read_text(encoding="utf-8")
        for html in (report, self.html):
            self.assertIn("Evidence decision accuracy", html)
            self.assertNotIn("Abstention accuracy", html)


if __name__ == "__main__":
    unittest.main()
