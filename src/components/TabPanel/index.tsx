interface TabPanelProps {
  children?: React.ReactNode;
  value: any;
  index: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`${value}`} className="" {...other}>
      {value === index && <>{children}</>}
    </div>
  );
}

export default TabPanel;
