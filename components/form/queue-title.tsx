import React, { FunctionComponent } from 'react';
import { TextInput } from 'grommet';
import { motion } from 'framer-motion';
import { useForm } from '../../common/hooks/useForm';

interface QueueTitleProps {
  size: string;
}

const QueueTitle: FunctionComponent<QueueTitleProps> = (props) => {
  const { size } = props;
  const { queueTitle, setQueueTitle, progress, setProgress } = useForm();

  return (
    <motion.div whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.9 }}>
      <TextInput
        title="click to edit queue name"
        plain
        onChange={(event) => {
          let prog = progress;
          const name = event.target.value;
          if (name.length === 1 && queueTitle.length === 0) prog++;
          else if (name.length === 0) prog--;
          setQueueTitle(name);
          setProgress(prog);
        }}
        value={queueTitle}
        placeholder="new queue"
        style={{
          textAlign: 'center',
          fontSize: size === 'large' ? 48 : 'medium' ? 40 : 24
        }}
      />
    </motion.div>
  );
};

export default QueueTitle;
