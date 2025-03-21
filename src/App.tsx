import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

import { useWorkflowStore } from './store/workflow';
import { useActionsStore } from './store/actionsStore';
import Sidebar from './components/Sidebar';
import TriggerNode from './components/nodes/TriggerNode';
import ActionNode from './components/nodes/ActionNode';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100vh',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  sidebarContainer: {
    flexShrink: 0,
    position: 'relative',
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: tokens.colorNeutralStroke2,
  },
  resizeHandle: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '4px',
    cursor: 'col-resize',
    ...shorthands.transition('all', '150ms', 'ease'),
    ':hover': {
      backgroundColor: tokens.colorBrandBackground,
    },
  },
  mainContent: {
    display: 'flex',
    flexGrow: 1,
  },
  flowContainer: {
    flexGrow: 1,
    height: '100vh',
  },
});

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
};

function App() {
  const styles = useStyles();
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useWorkflowStore();
  const initializeDefaultCategories = useActionsStore(state => state.initializeDefaultCategories);
  const [sidebarWidth, setSidebarWidth] = useState(340);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    initializeDefaultCategories();
  }, [initializeDefaultCategories]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const position = {
        x: event.clientX - sidebarWidth,
        y: event.clientY - 40,
      };

      const newNode = {
        id: `${data.type}_${Date.now()}`,
        type: data.type,
        position,
        data: data.data,
      };

      useWorkflowStore.setState((state) => ({
        nodes: [...state.nodes, newNode],
      }));
    },
    [sidebarWidth]
  );

  const startResizing = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = e.clientX;
        if (newWidth >= 280 && newWidth <= 800) {
          setSidebarWidth(newWidth);
        }
      }
    },
    [isResizing]
  );

  React.useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div className={styles.root}>
      <div 
        className={styles.sidebarContainer}
        style={{ width: sidebarWidth }}
      >
        <Sidebar />
        <div
          className={styles.resizeHandle}
          onMouseDown={startResizing}
        />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.flowContainer}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onDragOver={onDragOver}
            onDrop={onDrop}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default App;