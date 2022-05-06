import { FaFileExport } from 'react-icons/fa';
import { Button } from 'src/components/common';
import '../styles.scss';

export const ExportButton = ({ onClick, ...props }) => (
  <Button
    variant="outline"
    icon={<FaFileExport />}
    iconPosition="right"
    className="cmp-head-extras-export-button"
    onClick={onClick}
    {...props}>
    Export
  </Button>
);
