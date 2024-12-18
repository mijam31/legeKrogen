import PageheaderOther from "../../components/pageHeader/PageHeaderOther";
import headerImg from "../../assets/heros/medlem.jpg";
import Newsletter from "../../components/newsletter/Newsletter";

const CustomerClub = () => {
  return (
    <section>
      <PageheaderOther
        headerImg={headerImg}
        title="Bliv medlem af vores"
        subTitle="KUNDEKLUB"
        text="og få eksklusive nyheder før alle andre"
      />
      <Newsletter />
    </section>
  );
};

export default CustomerClub;
