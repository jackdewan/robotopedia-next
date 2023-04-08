import { CMS_NAME } from "../lib/constants";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center justify-end mt-16 mb-16 md:mb-12">
      {/* <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Robotopedia
      </h1> */}
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Sharing the world's knowledge on industrial robots and automation.
      </h4>
    </section>
  );
};

export default Intro;
