import type { ArticleKind } from "@/data/activity";

export type OrcidWork = {
  id: string;
  kind: ArticleKind;
  title: string;
  venue: string;
  date: string; // ISO yyyy-mm-dd
  url: string;
  type: string;
};

const TYPE_MAP: Record<string, ArticleKind> = {
  "conference-paper": "conference",
  "conference-abstract": "conference",
  "conference-poster": "conference",
  "journal-article": "journal",
  "journal-issue": "journal",
  "book-chapter": "bookchapter",
  "book": "bookchapter",
  "edited-book": "bookchapter",
  "dissertation": "thesis",
  "dissertation-thesis": "thesis",
  "supervised-student-publication": "thesis",
};

function pickUrl(externalIds: any, putCode: number, orcidId: string): string {
  const ids = externalIds?.["external-id"] ?? [];
  const doi = ids.find((i: any) => i?.["external-id-type"] === "doi");
  if (doi?.["external-id-value"]) return `https://doi.org/${doi["external-id-value"]}`;
  const url = ids.find((i: any) => i?.["external-id-type"] === "uri" || i?.["external-id-type"] === "handle");
  const v = url?.["external-id-url"]?.value || url?.["external-id-value"];
  if (v) return v;
  return `https://orcid.org/${orcidId}/work/${putCode}`;
}

function pickDate(pub: any): string {
  const y = pub?.year?.value;
  if (!y) return "";
  const m = pub?.month?.value ?? "01";
  const d = pub?.day?.value ?? "01";
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export async function fetchOrcidWorks(orcidId: string): Promise<OrcidWork[]> {
  const res = await fetch(`https://pub.orcid.org/v3.0/${orcidId}/works`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`ORCID ${res.status}`);
  const json: any = await res.json();
  const groups: any[] = json?.group ?? [];

  const works: OrcidWork[] = groups.map((g: any) => {
    const summaries: any[] = g?.["work-summary"] ?? [];
    const s = summaries[0];
    if (!s) return null;
    const type = s?.type ?? "journal-article";
    return {
      id: String(s?.["put-code"] ?? Math.random()),
      kind: TYPE_MAP[type] ?? "journal",
      title: s?.title?.title?.value ?? "Untitled",
      venue: s?.["journal-title"]?.value ?? "",
      date: pickDate(s?.["publication-date"]),
      url: pickUrl(s?.["external-ids"] ?? g?.["external-ids"], s?.["put-code"], orcidId),
      type,
    };
  }).filter(Boolean) as OrcidWork[];

  return works.sort((a, b) => b.date.localeCompare(a.date));
}
