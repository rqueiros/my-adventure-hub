// Field configuration per facet — drives the generic admin table + form.
import type { LucideIcon } from "lucide-react";
import {
  BookOpen, FileText, Mic, Boxes, Plane, Footprints, PenSquare,
  Sparkles, CalendarClock, User,
} from "lucide-react";

export type FieldType = "text" | "textarea" | "date" | "number" | "url" | "select" | "json";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[]; // for select
  placeholder?: string;
};

export type FacetConfig = {
  table: string;
  label: string;
  icon: LucideIcon;
  singleton?: boolean; // profile
  columns: { key: string; label: string; image?: boolean }[];
  fields: Field[];
};

export const FACETS: Record<string, FacetConfig> = {
  profile: {
    table: "profile", label: "Profile", icon: User, singleton: true,
    columns: [{ key: "name", label: "Name" }, { key: "title", label: "Title" }],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "bio", label: "Bio", type: "textarea", required: true },
      { name: "orcid", label: "ORCID", type: "text" },
      { name: "website", label: "Website", type: "url" },
      { name: "avatar", label: "Avatar URL", type: "url" },
      { name: "socials", label: "Socials (JSON)", type: "json" },
    ],
  },
  books: {
    table: "books", label: "Books", icon: BookOpen,
    columns: [
      { key: "image", label: "Cover", image: true },
      { key: "date", label: "Date" }, { key: "title", label: "Title" },
      { key: "publisher", label: "Publisher" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "publisher", label: "Publisher", type: "text" },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "meta", label: "Meta (e.g. pages)", type: "text" },
      { name: "image", label: "Cover image URL", type: "url" },
      { name: "url", label: "Link", type: "url" },
    ],
  },
  events: {
    table: "events", label: "Events", icon: Mic,
    columns: [
      { key: "image", label: "", image: true },
      { key: "date", label: "Date" }, { key: "kind", label: "Kind" },
      { key: "title", label: "Title" },
    ],
    fields: [
      { name: "kind", label: "Kind", type: "select", required: true,
        options: ["talk","seminar","workshop","conference","podcast","arguencia","hackathon"] },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "subtitle", label: "Subtitle / venue", type: "text" },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "meta", label: "Duration / extra", type: "text" },
      { name: "image", label: "Image URL", type: "url" },
      { name: "url", label: "Link", type: "url" },
    ],
  },
  projects: {
    table: "projects", label: "Projects", icon: Boxes,
    columns: [
      { key: "image", label: "", image: true },
      { key: "date", label: "Date" }, { key: "title", label: "Title" },
      { key: "meta", label: "Status" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "meta", label: "Status", type: "text" },
      { name: "image", label: "Image URL", type: "url" },
      { name: "url", label: "Link", type: "url" },
    ],
  },
  travels: {
    table: "travels", label: "Travels", icon: Plane,
    columns: [
      { key: "image", label: "", image: true },
      { key: "date", label: "Date" }, { key: "country", label: "Country" },
      { key: "title", label: "Place" }, { key: "continent", label: "Continent" },
    ],
    fields: [
      { name: "continent", label: "Continent", type: "select", required: true,
        options: ["Europe","Asia","Africa","North America","South America","Oceania"] },
      { name: "country", label: "Country", type: "text", required: true },
      { name: "title", label: "Place / region", type: "text", required: true },
      { name: "subtitle", label: "Note", type: "text" },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "meta", label: "Duration", type: "text" },
      { name: "lat", label: "Latitude", type: "number" },
      { name: "lng", label: "Longitude", type: "number" },
      { name: "image", label: "Image URL", type: "url" },
      { name: "url", label: "Link", type: "url" },
    ],
  },
  running: {
    table: "running", label: "Running", icon: Footprints,
    columns: [
      { key: "date", label: "Date" }, { key: "race_name", label: "Race" },
      { key: "distance", label: "Distance" }, { key: "time", label: "Time" },
    ],
    fields: [
      { name: "race_name", label: "Race name", type: "text", required: true },
      { name: "distance", label: "Distance", type: "select", required: true,
        options: ["10K","21K","42K"] },
      { name: "year", label: "Year", type: "number", required: true },
      { name: "time", label: "Time (HH:MM:SS)", type: "text", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "image", label: "Image URL", type: "url" },
      { name: "url", label: "Link", type: "url" },
    ],
  },
  opinion: {
    table: "opinion", label: "Opinion", icon: PenSquare,
    columns: [
      { key: "image", label: "", image: true },
      { key: "date", label: "Date" }, { key: "magazine", label: "Magazine" },
      { key: "title", label: "Title" },
    ],
    fields: [
      { name: "magazine", label: "Magazine", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "subtitle", label: "Subtitle / kind", type: "text" },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "image", label: "Image URL", type: "url" },
      { name: "url", label: "External link", type: "url" },
      { name: "body", label: "Body (paragraphs separated by blank lines)", type: "textarea", required: true },
    ],
  },
  others: {
    table: "others", label: "Others", icon: Sparkles,
    columns: [
      { key: "date", label: "Date" }, { key: "kind", label: "Kind" },
      { key: "role", label: "Role" }, { key: "title", label: "Title" },
    ],
    fields: [
      { name: "kind", label: "Kind", type: "select", required: true,
        options: ["supervision","committee","editorial","service"] },
      { name: "role", label: "Role", type: "text" },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "image", label: "Image URL", type: "url" },
      { name: "url", label: "Link", type: "url" },
    ],
  },
  upcoming: {
    table: "upcoming", label: "Upcoming", icon: CalendarClock,
    columns: [
      { key: "image", label: "", image: true },
      { key: "date", label: "Date" }, { key: "facet", label: "Facet" },
      { key: "title", label: "Title" },
    ],
    fields: [
      { name: "facet", label: "Facet", type: "select", required: true,
        options: ["books","articles","events","projects","travels","running","opinion","others"] },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "meta", label: "Meta", type: "text" },
      { name: "image", label: "Image URL", type: "url" },
      { name: "url", label: "Link", type: "url" },
    ],
  },
};

export const FACET_KEYS = Object.keys(FACETS);
// Article tile points to ORCID; we don't have a writable articles table.
