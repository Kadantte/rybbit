"use client";
import { Card, CardContent, CardLoader } from "@/components/ui/card";
import { BucketSelection } from "./BucketSelection";
import { Chart } from "./Chart";
import { Overview } from "./Overview";
import { PreviousChart } from "./PreviousChart";
import { useStore } from "../../../../../lib/store";
import { useGetOverviewBucketed } from "../../../../../api/analytics/useGetOverviewBucketed";
import { useGetOverview } from "../../../../../api/analytics/useGetOverview";
import { Tilt_Warp } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "../../../../../lib/auth";

const SELECTED_STAT_MAP = {
  pageviews: "Pageviews",
  sessions: "Sessions",
  pages_per_session: "Pages per Session",
  bounce_rate: "Bounce Rate",
  session_duration: "Session Duration",
  users: "Users",
};

const tilt_wrap = Tilt_Warp({
  subsets: ["latin"],
  weight: "400",
});

export function MainSection() {
  const session = authClient.useSession();

  const { selectedStat, time, site, bucket } = useStore();

  const { data, isFetching, error } = useGetOverviewBucketed({ site, bucket });
  const {
    data: previousData,
    isFetching: isPreviousFetching,
    error: previousError,
  } = useGetOverviewBucketed({ periodTime: "previous", site, bucket });
  const { isFetching: isOverviewFetching } = useGetOverview({ site });
  const { isFetching: isOverviewFetchingPrevious } = useGetOverview({
    site,
    periodTime: "previous",
  });

  const maxOfDataAndPreviousData = Math.max(
    Math.max(...(data?.data?.map((d) => d[selectedStat]) ?? [])),
    Math.max(...(previousData?.data?.map((d) => d[selectedStat]) ?? []))
  );

  return (
    <>
      <Card>
        <CardContent className="p-0 w-full">
          <Overview />
        </CardContent>
        {(isOverviewFetching || isOverviewFetchingPrevious) && <CardLoader />}
      </Card>
      <Card>
        {(isFetching || isPreviousFetching) && <CardLoader />}
        <CardContent className="p-2 md:p-4 py-3 w-full">
          <div className="flex items-center justify-between px-2 md:px-0">
            <div className="flex items-center space-x-4">
              <Link
                href={session.data ? "/" : "https://rybbit.io"}
                className={`text-lg font-semibold flex items-center gap-1.5 ${tilt_wrap.className} opacity-75`}
              >
                <Image src="/rybbit.png" alt="Rybbit" width={20} height={20} />
                rybbit.io
              </Link>
            </div>
            <span className="text-sm text-neutral-200">
              {SELECTED_STAT_MAP[selectedStat]}
            </span>
            <BucketSelection />
          </div>
          <div className="h-[200px] md:h-[290px] relative">
            <div className="absolute top-0 left-0 w-full h-full">
              <PreviousChart
                data={previousData}
                max={maxOfDataAndPreviousData}
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full">
              <Chart
                data={data}
                max={maxOfDataAndPreviousData}
                previousData={
                  time.mode === "all-time" ? undefined : previousData
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
