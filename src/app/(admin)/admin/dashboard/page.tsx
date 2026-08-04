import React from "react";
import { AdminHeader } from "@/components/admin/header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getProjectsAction } from "@/actions/projects.actions";
import { getWritingAction } from "@/actions/writing.actions";
import { getMessagesAction } from "@/actions/messages.actions";
import { getAwardsAction } from "@/actions/awards.actions";
import { Film, FileText, Mail, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminDashboardPage() {
  const [projectsRes, writingRes, messagesRes, awardsRes] = await Promise.all([
    getProjectsAction({ publishedOnly: false }),
    getWritingAction({ publishedOnly: false }),
    getMessagesAction(),
    getAwardsAction(),
  ]);

  const projects = projectsRes.data || [];
  const writing = writingRes.data || [];
  const messages = messagesRes.data || [];
  const awards = awardsRes.data || [];

  const unreadMessagesCount = messages.filter((m: { is_archived?: boolean }) => !m.is_archived).length;

  return (
    <div className="space-y-8 pb-16">
      <AdminHeader
        title="Overview Dashboard"
        subtitle="Platform metrics, recent inquiries, and quick management links"
      />

      <div className="px-8 space-y-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Total Projects</p>
                <p className="font-heading text-3xl font-bold text-white mt-1">{projects.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-gold/10 text-gold border border-gold/20">
                <Film className="h-6 w-6" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Writing Pieces</p>
                <p className="font-heading text-3xl font-bold text-white mt-1">{writing.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-gold/10 text-gold border border-gold/20">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Client Inquiries</p>
                <p className="font-heading text-3xl font-bold text-white mt-1">{messages.length}</p>
                {unreadMessagesCount > 0 && (
                  <span className="text-[10px] text-gold font-semibold">{unreadMessagesCount} unarchived</span>
                )}
              </div>
              <div className="p-3 rounded-lg bg-gold/10 text-gold border border-gold/20">
                <Mail className="h-6 w-6" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Awards & Accolades</p>
                <p className="font-heading text-3xl font-bold text-white mt-1">{awards.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-gold/10 text-gold border border-gold/20">
                <Trophy className="h-6 w-6" />
              </div>
            </div>
          </Card>
        </div>

        {/* Dashboard 2 Column Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Messages */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Recent Client Inquiries</CardTitle>
              <Button variant="link" size="sm" asChild>
                <Link href="/admin/dashboard/messages" className="text-gold text-xs flex items-center gap-1">
                  <span>View All</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {messages.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">No messages received yet.</p>
              ) : (
                messages.slice(0, 4).map((msg) => (
                  <div key={msg.id} className="p-3.5 rounded-lg border border-slate bg-navy/30 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{msg.name}</span>
                      <span className="text-muted-foreground">{msg.email}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{msg.message}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Latest Projects */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Latest Portfolio Projects</CardTitle>
              <Button variant="link" size="sm" asChild>
                <Link href="/admin/dashboard/projects" className="text-gold text-xs flex items-center gap-1">
                  <span>Manage Projects</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {projects.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">No projects created yet.</p>
              ) : (
                projects.slice(0, 4).map((proj) => (
                  <div key={proj.id} className="flex items-center justify-between p-3.5 rounded-lg border border-slate bg-navy/30">
                    <div>
                      <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                      <p className="text-xs text-muted-foreground">{proj.client} • {proj.year}</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded border border-gold/40 text-gold">
                      {proj.category_slug}
                    </span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
