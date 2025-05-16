"use client"
import { useInView } from 'react-intersection-observer';
import { cloneElement, ReactElement, ReactNode, useRef } from 'react';

type LayoutEffectProps = {
  children: ReactElement;
  className?: string;
  isInviewState: {
    trueState: string;
    falseState: string;
  };
};

const LayoutEffect: React.FC<LayoutEffectProps> = ({
  children,
  className,
  isInviewState: { trueState = '', falseState = '' },
}: LayoutEffectProps) => {
  const ref = useRef(null);
  const [inViewRef, inView] = useInView({ triggerOnce: true });

  return (
    <div ref={inViewRef} className={`${children.props.className || ''} ${className || ''} ${inView ? trueState : falseState}`}>
      {cloneElement(children, { inView })}
    </div>
  );
};

export default LayoutEffect;
