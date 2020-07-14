import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import ChatBubble from '@material-ui/icons/ChatBubble';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { useSnackbar } from 'notistack';
import ChatInput from './ChatInput';
import { ClickAwayListener } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
    },
  })
);

export default function ChatSnackButton() {
  const classes = useStyles();
  const { room } = useVideoContext();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = (message: string) => {
    const [dataTrackPublication] = [...room.localParticipant.dataTracks.values()];
    if (dataTrackPublication) {
      const fullMessage = `${room.localParticipant.identity} says: ${message}`;
      dataTrackPublication.track.send(fullMessage);
      enqueueSnackbar(fullMessage);
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <Tooltip
        title={<ChatInput onSend={handleSend} />}
        interactive
        placement="top"
        PopperProps={{ disablePortal: true }}
        arrow={true}
        open={isOpen}
      >
        <Fab className={classes.fab} onClick={() => setIsOpen(prev => !prev)}>
          <ChatBubble />
        </Fab>
      </Tooltip>
    </ClickAwayListener>
  );
}
