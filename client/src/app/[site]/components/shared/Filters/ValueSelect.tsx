"use client";

import { useMemo } from "react";

import { getCountryName, getLanguageName } from "../../../../../lib/utils";

import { FilterParameter } from "../../../../../lib/store";

import { useSingleCol } from "../../../../../api/analytics/useSingleCol";
import { MultiSelect } from "../../../../../components/MultiSelect";
import { useGetRegionName } from "../../../../../lib/geo";

export function ValueSelect({
  parameter,
  value,
  onChange,
}: {
  parameter: FilterParameter;
  value: string[];
  onChange: (values: string[]) => void;
}) {
  const { data, isFetching } = useSingleCol({
    parameter,
    limit: 1000,
    useFilters: false,
  });

  const { getRegionName } = useGetRegionName();

  const getValueLabel = (val: string) => {
    if (parameter === "country") {
      return getCountryName(val);
    }
    if (parameter === "region") {
      return getRegionName(val);
    }
    if (parameter === "language") {
      return getLanguageName(val);
    }
    return val;
  };

  const suggestions = useMemo(() => {
    return (
      data?.data
        ?.map((item) => item.value)
        .filter(Boolean)
        .map((val) => ({
          value: val,
          label: getValueLabel(val),
        })) || []
    );
  }, [data, parameter, getRegionName]);

  const handleChange = (selected: any) => {
    const values = selected.map((item: { value: string }) => item.value);
    onChange(values);
  };

  return (
    <MultiSelect
      value={value.map((val) => ({
        value: val,
        label: getValueLabel(val),
      }))}
      options={isFetching ? [] : suggestions}
      onChange={handleChange}
      placeholder="Select values..."
      isLoading={isFetching}
    />
  );
}
