import { useQuery } from "@tanstack/react-query";
import { authedFetch, getStartAndEndDate } from "../utils";
import { BACKEND_URL } from "../../lib/const";
import { Time } from "../../components/DateSelector/types";

export interface JourneyParams {
  siteId?: number;
  steps?: number;
  timeZone?: string;
  time: Time;
  limit?: number;
}

export interface Journey {
  path: string[];
  count: number;
  percentage: number;
}

export interface JourneysResponse {
  journeys: Journey[];
}

export const useJourneys = ({
  siteId,
  steps = 3,
  timeZone = "UTC",
  time,
  limit = 100,
}: JourneyParams) => {
  const { startDate, endDate } = getStartAndEndDate(time);

  return useQuery<JourneysResponse>({
    queryKey: ["journeys", siteId, steps, startDate, endDate, timeZone, limit],
    queryFn: async () => {
      let url = `${BACKEND_URL}/journeys/${siteId}`;
      const params = new URLSearchParams();

      if (steps) params.append("steps", steps.toString());
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (timeZone) params.append("timeZone", timeZone);
      if (limit) params.append("limit", limit.toString());

      const queryString = params.toString();
      if (queryString) url += `?${queryString}`;

      const response = await authedFetch(url);
      return response.json();
    },
    enabled: !!siteId,
  });
};
