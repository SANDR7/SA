import PageContainer from "../components/layout/main";
import Callout from "../components/ui/section/Callout";
import { meta } from "../data/meta";

const Custom404 = ({ Custom404 }: any) => {
  return (
    <PageContainer title={meta.title}>
      <div className="h-[55vh]">
        <Callout
          subTitle="Ooowh"
          description={`Well... You discoverd the 404 page. How did you get here? What was the reason to go this path? Because there is nothing interesting here...`}
        >
          404 page
        </Callout>
      </div>
    </PageContainer>
  );
};

export default Custom404;
