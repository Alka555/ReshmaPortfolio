import React from "react";
import { AdminHeader } from "@/components/admin/header";
import { getProjectsAction } from "@/actions/projects.actions";
import { DataTable, Column } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export default async function AdminProjectsPage() {
  const { data: projects = [] } = await getProjectsAction({ publishedOnly: false });

  const columns: Column<(typeof projects)[0]>[] = [
    {
      header: "Project Title",
      cell: (item) => (
        <div>
          <p className="font-bold text-white">{item.title}</p>
          <p className="text-xs text-muted-foreground">/{item.slug}</p>
        </div>
      ),
    },
    { header: "Client", accessorKey: "client" },
    { header: "Year", accessorKey: "year" },
    {
      header: "Category",
      cell: (item) => <Badge variant="outline">{item.category_slug}</Badge>,
    },
    {
      header: "Status",
      cell: (item) => (
        <div className="flex items-center space-x-2">
          {item.featured && <Badge variant="gold">Featured</Badge>}
          <Badge variant={item.published ? "default" : "muted"}>
            {item.published ? "Published" : "Draft"}
          </Badge>
        </div>
      ),
    },
    {
      header: "Actions",
      cell: (item) => (
        <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>{item.featured ? "Featured" : "Standard"}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      <AdminHeader
        title="Project Management"
        subtitle="Create, edit, feature, and organize portfolio films and product video showcases"
      />

      <div className="px-8 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing {projects.length} portfolio entries</p>
          <Button variant="primary" size="default" className="gap-2">
            <Plus className="h-4 w-4" />
            <span>Add New Project</span>
          </Button>
        </div>

        <DataTable
          data={projects}
          columns={columns}
          keyExtractor={(item) => item.id}
          emptyText="No portfolio projects added yet."
        />
      </div>
    </div>
  );
}
