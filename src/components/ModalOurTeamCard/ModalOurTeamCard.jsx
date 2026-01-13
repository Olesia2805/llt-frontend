export function TeamCard({ name, role, img }) {
  return (
    <div className="rounded-xl bg-[#192633] p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mx-auto mb-4 h-24 w-24 rounded-full overflow-hidden border-4 border-[#324d67]">
        <img src={img} alt={name} className="h-full w-full object-cover" />
      </div>
      <h3 className="text-xl font-bold text-white">{name}</h3>
      <p className="mt-2 text-sm text-[#92adc9]">{role}</p>
    </div>
  );
}
