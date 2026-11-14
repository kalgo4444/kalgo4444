// Templates remount on every navigation, so this CSS fade replays per route with no client JavaScript.
export default function Template({ children }: LayoutProps<"/">) {
  return <div className="frame grid animate-fade grid-cols-1">{children}</div>;
}
