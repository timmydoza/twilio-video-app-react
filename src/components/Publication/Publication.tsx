import React, { useEffect } from 'react';
import useTrack from '../../hooks/useTrack/useTrack';
import AudioTrack from '../AudioTrack/AudioTrack';
import VideoTrack from '../VideoTrack/VideoTrack';

import { IVideoTrack } from '../../types';
import {
  AudioTrack as IAudioTrack,
  LocalTrackPublication,
  Participant,
  RemoteTrackPublication,
  Track,
  DataTrack,
} from 'twilio-video';
import { useSnackbar } from 'notistack';

interface PublicationProps {
  publication: LocalTrackPublication | RemoteTrackPublication;
  participant: Participant;
  isLocal: boolean;
  videoOnly?: boolean;
  videoPriority?: Track.Priority | null;
}

function IDataTrack({ track }: { track: DataTrack }) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const handleMessage = (message: string) => enqueueSnackbar(message);
    track.on('message', handleMessage);
    return () => {
      track.off('message', handleMessage);
    };
  }, [track, enqueueSnackbar]);
  return null;
}

export default function Publication({ publication, isLocal, videoPriority, videoOnly }: PublicationProps) {
  const track = useTrack(publication);

  if (!track) return null;

  switch (track.kind) {
    case 'video':
      return (
        <VideoTrack
          track={track as IVideoTrack}
          priority={videoPriority}
          isLocal={track.name.includes('camera') && isLocal}
        />
      );
    case 'audio':
      return videoOnly ? null : <AudioTrack track={track as IAudioTrack} />;
    case 'data':
      return videoOnly ? null : <IDataTrack track={track} />;
    default:
      return null;
  }
}
