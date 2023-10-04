export function getChartOverrides(theme: any) {
  return {};
}

export const ENABLED_FEATURES = [
  // "dont_show_boolean_study_arguments",
  // "hide_last_na_study_output",
  "save_chart_properties_to_local_storage",
  "use_localstorage_for_settings",
  "study_templates",
  "save_all_chart_properties_to_local_storage",
];

export const DISABLED_FEATURES = [
  // "header_symbol_search",
  // "header_widget",
  "symbol_info",
  "header_compare",
  // "header_chart_type",
  // "display_market_status",
  // "symbol_search_hot_key",
  "volume_force_overlay",
  // "compare_symbol",
  // "border_around_the_chart",
  // "remove_library_container_border",
  // "header_interval_dialog_button",
  "show_interval_dialog_on_key_press",
  // "header_saveload",
  // "header_symbol_search_hot_key",
  // "header_interval_dropdown",
  // "header_undo_redo",
  // "header_screenshot",
  // "header_settings",
  // "header_fullscreen_button",
  // "header_indicators",
  // "header_interval_dialog_button",
];


export const INTERVAL = {
  MINUTES_5: "5",
  MINUTES_15: "15",
  MINUTES_30: "30",
  HOURS_2: "120",
  HOURS_4: "240",
  DAY: "D",
  HOUR: "60",
  HOURS_3: "180",
  HOURS_6: "360",
  HOURS_12: "720",
  WEEK: "W",
};
export const TIME_FRAMES = [
  { text: "5m", resolution: INTERVAL.MINUTES_5 },
  { text: "15m", resolution: INTERVAL.MINUTES_15 },
  { text: "30m", resolution: INTERVAL.MINUTES_30 },
  { text: "2h", resolution: INTERVAL.HOURS_2 },
  { text: "4h", resolution: INTERVAL.HOURS_4 },
  { text: "1d", resolution: INTERVAL.DAY },
];
