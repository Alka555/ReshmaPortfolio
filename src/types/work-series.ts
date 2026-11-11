export interface InstagramSliderItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  href: string;
  label: string;
}

export interface WorkSeries {
  id: string;
  title: string;
  /** Total episode count shown in the heading (may differ from items uploaded so far). */
  episodes?: number;
  /** Optional small cover image shown beside the heading. */
  cover?: string;
  items: readonly InstagramSliderItem[];
}
