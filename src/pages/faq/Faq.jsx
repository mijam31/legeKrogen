import PageheaderOther from "../../components/pageHeader/PageHeaderOther";
import headerImg from "../../assets/heros/FAQ.jpg";
import ClubTeaser from "../../components/clubTeaser/ClubTeaser";

import Questions from "../../components/questions/Questions";

const Faq = () => {
  return (
    <section>
      <PageheaderOther
        headerImg={headerImg}
        title="Har du nogle"
        subTitle="SPØRGSMÅL?"
        text="Måske er de allerede besvaret herunder. Ellers er du altid velkommen til at kontakte os."
      />
      <Questions />
      <ClubTeaser />
    </section>
  );
};

export default Faq;
