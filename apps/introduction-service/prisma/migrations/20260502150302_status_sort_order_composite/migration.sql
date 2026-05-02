-- Composite (status, sort_order) for every public list. The public
-- endpoints filter `status='active'` and order by `sort_order ASC` —
-- without this composite Postgres can use only one of the standalone
-- indexes per query and re-sort the rest of the working set.
CREATE INDEX "projects_idx_status_sort_order"      ON "projects"("status", "sort_order");
CREATE INDEX "about_sections_idx_status_sort_order" ON "about_sections"("status", "sort_order");
CREATE INDEX "staff_idx_status_sort_order"          ON "staff"("status", "sort_order");
CREATE INDEX "testimonials_idx_status_sort_order"   ON "testimonials"("status", "sort_order");
CREATE INDEX "partners_idx_status_sort_order"       ON "partners"("status", "sort_order");
CREATE INDEX "galleries_idx_status_sort_order"      ON "galleries"("status", "sort_order");
CREATE INDEX "certificates_idx_status_sort_order"   ON "certificates"("status", "sort_order");
CREATE INDEX "faqs_idx_status_sort_order"           ON "faqs"("status", "sort_order");
