# Architecture
- Keep training data, image paths and form labels in runtime Markdown so static hosting can update content without rebuilding JavaScript.
- Training inquiries use FormSubmit directly from the static client; do not introduce storage or server code for this chosen delivery destination.