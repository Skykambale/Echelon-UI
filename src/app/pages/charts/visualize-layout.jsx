import BarChart from "@/app/components/charts/bar-chart";

const VisualizeLayout = () => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      {/* Bar chart */}
      <div className="flex w-full h-4/5 border border-red-600 px-6 m-auto">
        <BarChart />
      </div>
    </div>
  );
};

export default VisualizeLayout;
