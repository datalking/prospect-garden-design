import {
  Dispatch,
  MutableRefObject,
  ReactElement,
  SetStateAction,
} from 'react';

import { Orientation } from './orientation.types';

export interface SplitViewStatelyProps {
  allowsCollapsing?: boolean;
  onResize?: (primarySize: number) => void;
  onResizeEnd?: (primarySize: number) => void;
  primarySize?: number;
  defaultPrimarySize?: number;
}

export interface SplitViewHandleState {
  offset: number;
  dragging: boolean;
  hovered: boolean;
  setOffset: (value: number) => void;
  setDragging: (value: boolean) => void;
  setHover: (value: boolean) => void;
  increment: () => void;
  decrement: () => void;
  incrementToMax: () => void;
  decrementToMin: () => void;
  collapseToggle: () => void;
}

export interface SplitViewContainerState {
  minPos: number;
  maxPos: number;
  setMinPos: Dispatch<SetStateAction<number>>;
  setMaxPos: Dispatch<SetStateAction<number>>;
}

export interface SplitViewState {
  handleState: SplitViewHandleState;
  containerState: SplitViewContainerState;
}

export interface SplitViewAriaProps {
  id?: string;
  allowsResizing?: boolean;
  orientation?: Orientation;
  primaryPane?: 0 | 1;
  primaryMinSize?: number;
  primaryMaxSize?: number;
  secondaryMinSize?: number;
  secondaryMaxSize?: number;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  containerRef?: MutableRefObject<HTMLDivElement>;
}

export interface SplitViewProps {
  children: [ReactElement, ReactElement];
  orientation?: Orientation;
  allowsResizing?: boolean;
  allowsCollapsing?: boolean;
  onResize?: (primarySize: number) => void;
  onResizeEnd?: (primarySize: number) => void;
  primaryPane?: 0 | 1;
  primarySize?: number;
  defaultPrimarySize?: number;
  primaryMinSize?: number;
  primaryMaxSize?: number;
  secondaryMinSize?: number;
  secondaryMaxSize?: number;
}