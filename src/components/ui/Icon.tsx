import {
  BookOpen,
  Calendar,
  Clock,
  Handshake,
  IdCard,
  Layers,
  LayoutGrid,
  Megaphone,
  Package,
  PenTool,
  Pill,
  Printer,
  ScanSearch,
  ShoppingBag,
  Sparkles,
  Tag,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const icons = {
  bookOpen: BookOpen,
  calendar: Calendar,
  clock: Clock,
  handshake: Handshake,
  idCard: IdCard,
  layers: Layers,
  layoutGrid: LayoutGrid,
  megaphone: Megaphone,
  package: Package,
  penTool: PenTool,
  pill: Pill,
  printer: Printer,
  scanSearch: ScanSearch,
  shoppingBag: ShoppingBag,
  sparkles: Sparkles,
  tag: Tag,
  users: Users,
  workflow: Workflow,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Cmp = icons[name];
  return <Cmp aria-hidden="true" className={className} strokeWidth={1.75} />;
}
