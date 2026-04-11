import { Article } from "@/types";

export const mockArticles: Article[] = [
  {
    id: 1,
    title: "The Quantum Leap: Why Silicon is No Longer Enough",
    author: "Sarah Jenkins",
    category: "Tech",
    status: "Published",
    publishDate: "Oct 24, 2024",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC0NzrwY2qgd8blRuZrqTuSpl-lDfZCqGX76lxsjVeKkPZXdpgmxhdnHtTmBMTKlzpGWm416TPzxD0LZGoCl8vlzoQwoUUaXL4ODz5jurBDPttclIhOPP-qeUD0gRP7tL9c9XqeS1Xgh2ugWDRzRdbaxNHvsLF5b47fFKgJfD80_okRH1WQSnGhgUWO0am5b5kSQdORyvozsCnFWvsSjXqlfImJt6g7aJF9fLUHm7bTF2eU15H_qn_ChPsTdrUdwzlBG4---MWnJFE",
  },
  {
    id: 2,
    title: "Reclaiming the Loom: The Rise of Artisanal Textiles",
    author: "Marcus Thorne",
    category: "Fashion",
    status: "Draft",
    publishDate: null,
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALBcJd7lNDoCMeRLbVsxYJdrUIkCxui-8w9pSFAubVLXNQ7WMW3G__pDbB1yah6hUTESl7UpRFPcS7Ca3EdEahhze7-uruszcmQBh-vA3qmZOmeYMO70AlneRfDscQjSfiiPNFzD9-d2GeNmx2cDYLnQ10x7gW5fcQ3xf-TXeYDZauHh4UjliObI39-C70Hj_lK8JGnWaQDNrKNxZ0apaMnf1r5k33Y3ahpGMSl_ckUXtMkFHdrRBWzWCyr3PQb1RxwVP5QTmsugM",
  },
  {
    id: 3,
    title: "Deep Field: Analyzing the First JWST Data Sets",
    author: "Dr. Elena Voss",
    category: "Science",
    status: "Published",
    publishDate: "Oct 21, 2024",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAARWXidh36kxyD9cXHp3zBH-TuqzGctDu_OqY4X98678fy5YsvkDu_k05hstzJpWGpbnmZ6_1yN_etM__Fk4L1sSNC0Uyu7hADJmfUyPcrx5e-hlmddz3zT0EV-gsmhZ0Y-VXk7nFF2IX8y1JOHFoezbcGK5zyrimukaXEGB6Lva7qYCa9khvww59gR3wwoHVrd1K8SxAZ5zkg6xL9cH_xXRrnAb936XHsA4pGXKZqE0qXC2YR8fP-OFKBAUbBTaK3z46bvJvgHSE",
  },
  {
    id: 4,
    title: "The Modern Playmaker: Evolution of the Midfielder",
    author: "David Chen",
    category: "Sports",
    status: "Published",
    publishDate: "Oct 19, 2024",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBN0p2ODxEZHOk3Ehp8PGOXOqriO2ZuNLtQOtxkL2PzFQkq02YC4YuQXOf60xwKW1j7UtzupEJp9wnd_8EOjYQVcSfStakxPKPBLHNKE-XfVE3o0GjOHe_cBfzTqgjZYqzlh8DHdA12lDrD5aJyro_Pp9ey58Nqh_Kx0cvgh7q55QWoxfIPgoeh-oQvfuyG81YBh-006m9k9Bk9imLv1xpgbWeEWUPoUCxBPySvPaY2XSRCEYjBNNRLUv_njz6Ph0o4ekExYl7vvs8",
  },
];

export const statsData = [
  {
    title: "Live Posts",
    value: "1,284",
    icon: "cloud_done",
    trend: "+12% vs last month",
    iconColor: "text-primary",
    bgColor: "bg-surface-container-low",
  },
  {
    title: "Active Drafts",
    value: "42",
    icon: "edit_note",
    iconColor: "text-tertiary",
    bgColor: "bg-surface-container-low",
  },
  {
    title: "Avg. Monthly Readership",
    value: "89.4k",
    icon: "visibility",
    iconColor: "text-on-surface",
    bgColor: "bg-surface-container-highest",
    borderLeft: true,
  },
];
