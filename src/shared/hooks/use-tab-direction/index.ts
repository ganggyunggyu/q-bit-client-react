import { useMemo, useRef } from 'react';

type TabId = string;

export const useTabDirection = (
  currentTab: TabId,
  orderedTabs: TabId[],
): number => {
  const prevTab = useRef<TabId>(currentTab);

  const direction = useMemo(() => {
    const from = prevTab.current;
    const to = currentTab;

    prevTab.current = to;

    const fromIndex = orderedTabs.indexOf(from);
    const toIndex = orderedTabs.indexOf(to);

    if (fromIndex === -1 || toIndex === -1) return 0;
    return toIndex > fromIndex ? 1 : -1;
  }, [currentTab, orderedTabs]);

  return direction;
};
