import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'src/redux/rootReducer';
import { Collapsible, View } from '../common';
import './styles.scss';

const Expandable: React.FC<Props> = ({
  label,
  children,
  isExpanded = false,
  noBorder = false,
  noPadding = false,
  className,
  variant,
  accordionPosition,
  contentOuterClassName,
  onToggle = () => {},
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  //================= Effects =================
  useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded]);

  //================= Handlers =================
  const handleToggle = () => {
    setExpanded(!expanded);
    onToggle(!expanded);
  };

  //================= Variables =================

  //================= Render =================
  return (
    <View
      className={cn(
        'cmp-expandable',
        {
          [`cmp-expandable--${variant}`]: variant,
          [`cmp-expandable--no-border`]: noBorder,
          [`cmp-expandable--no-padding`]: noPadding,
        },
        className,
      )}>
      <View
        className={cn('cmp-expandable__header')}
        onClick={handleToggle}
        isRow
        justify="space-between"
        align="center">
        <View flexGrow={1} className={cn('cmp-expandable__label')}>
          {label}
        </View>

        <View className={cn('cmp-expandable__arrow', { 'cmp-expandable__arrow--up': expanded })} />
      </View>
      <Collapsible
        open={expanded}
        trigger=""
        accordionPosition={accordionPosition}
        contentOuterClassName={contentOuterClassName}>
        <View className={cn('cmp-expandable__body')}>{children}</View>
      </Collapsible>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    label: string | React.ReactNode;
    children: React.ReactNode;
    isExpanded?: boolean;
    className?: string;
    variant?: 'primary' | 'danger' | 'warning' | 'secondary' | '';
    onToggle?: (value: boolean) => void;
    accordionPosition?: string;
    noBorder?: boolean;
    noPadding?: boolean;
    contentOuterClassName?: string;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Expandable);
