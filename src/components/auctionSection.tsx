import CardHero from "./cardHero";
import TitleSection from "./titleSection";

const AuctionSection = () => {
  return (
    <section className="py-10">
      <div className="space-y-4">
        <div className="flex flex-col items-start">
          <TitleSection title={"عرض المزايدة"} />
        </div>
        <CardHero
          banner={{
            id: 1,
            title: "مزاد من بداية 50 دينار",
            subtitle: "عرض عنوان المنتج",
            image: "/Banner/auction.png",
            link_url: "/",
            link_type: "product",
            link_id: "1",
            is_active: true,
            is_current: true,
            order: 1,
            start_date: "2025-11-23",
            end_date: "2025-11-23",
            created_at: "2025-11-23",
            updated_at: "2025-11-23",
          }}
        />
      </div>
      <div></div>
    </section>
  );
};

export default AuctionSection;
