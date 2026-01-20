export default function AdminMessageSectionGrid({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>;
}