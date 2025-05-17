"use client";

import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../components/ui/basic-tabs";
import { Card, CardContent } from "../../../../../components/ui/card";
import { StandardSection } from "../../../components/shared/StandardSection/StandardSection";
import { useGetSite } from "../../../../../api/admin/sites";
import { truncateString } from "../../../../../lib/utils";
import { Button } from "../../../../../components/ui/button";
import { Expand } from "lucide-react";

type Tab = "pages" | "entry_pages" | "exit_pages";

const MAX_LABEL_LENGTH = 70;

export function Pages() {
  const { data: siteMetadata } = useGetSite();
  const [tab, setTab] = useState<Tab>("pages");
  const [expanded, setExpanded] = useState(false);
  const close = () => {
    setExpanded(false);
  };

  return (
    <Card className="h-[405px]">
      <CardContent className="mt-2">
        <Tabs
          defaultValue="pages"
          value={tab}
          onValueChange={(value) => setTab(value as Tab)}
        >
          <div className="flex flex-row gap-2 justify-between items-center">
            <TabsList>
              <TabsTrigger value="pages">Pages</TabsTrigger>
              <TabsTrigger value="entry_pages">Entry Pages</TabsTrigger>
              <TabsTrigger value="exit_pages">Exit Pages</TabsTrigger>
            </TabsList>
            <Button size="smIcon" onClick={() => setExpanded(!expanded)}>
              <Expand className="w-4 h-4" />
            </Button>
          </div>
          <TabsContent value="pages">
            <StandardSection
              filterParameter="pathname"
              title="Pages"
              getValue={(e) => e.value}
              getKey={(e) => e.value}
              getLabel={(e) =>
                truncateString(e.value, MAX_LABEL_LENGTH) || "Other"
              }
              getLink={(e) => `https://${siteMetadata?.domain}${e.value}`}
              expanded={expanded}
              close={close}
            />
          </TabsContent>
          <TabsContent value="entry_pages">
            <StandardSection
              filterParameter="entry_page"
              title="Entry Pages"
              getValue={(e) => e.value}
              getKey={(e) => e.value}
              getLabel={(e) =>
                truncateString(e.value, MAX_LABEL_LENGTH) || "Other"
              }
              getLink={(e) => `https://${siteMetadata?.domain}${e.value}`}
              expanded={expanded}
              close={close}
            />
          </TabsContent>
          <TabsContent value="exit_pages">
            <StandardSection
              filterParameter="exit_page"
              title="Exit Pages"
              getValue={(e) => e.value}
              getKey={(e) => e.value}
              getLabel={(e) =>
                truncateString(e.value, MAX_LABEL_LENGTH) || "Other"
              }
              getLink={(e) => `https://${siteMetadata?.domain}${e.value}`}
              expanded={expanded}
              close={close}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
