import { useCall } from "../../contexts/call-context";
import Modal from "../common/modal";
import Button from "../common/button";
import { CallStates } from "peerprep-shared-types";

export interface VideoFeedProps {
  isVisible: boolean;
}

export const VideoFeed: React.FC<VideoFeedProps> = ({ isVisible }) => {
  const {
    callState,
    callPermissions,
    ownVideoRef,
    userVideoRef,
    call,
    acceptCall,
    endCall,
    setVideo,
    setAudio,
  } = useCall();

  const AcceptCallModal = () => {
    return (
      <Modal
        isOpen={callState.current_state === "CALL_RECEIVED"}
        isCloseable={false}
        width="md"
      >
        <div>
          <h1>{callState.otherUser} is calling you</h1>
          <div>
            <Button type="button" onClick={() => acceptCall()} text="Accept" />
            <Button type="reset" onClick={() => endCall()} text="Reject" />
          </div>
        </div>
      </Modal>
    );
  };

  const ToggleVideoButton = () => {
    return (
      <Button
        type="button"
        onClick={() => {
          setVideo(!callPermissions.videoOn);
        }}
        text={callPermissions.videoOn ? "Video On" : "Video Off"}
      />
    );
  };

  const ToggleAudioButton = () => {
    return (
      <Button
        type="button"
        onClick={() => {
          setAudio(!callPermissions.audioOn);
        }}
        text={callPermissions.audioOn ? "Audio On" : "Audio Off"}
      />
    );
  };

  const CallButton = () => {
    return (
      <Button
        type="button"
        onClick={() => {
          if (callState.current_state == CallStates.CALL_ENDED) {
            call();
          } else {
            endCall();
          }
        }}
        text={
          callState.current_state == CallStates.CALL_ENDED ? "Call" : "End Call"
        }
      />
    );
  };

  return (
    <div className={`relative h-full w-full ${isVisible ? "z-50" : "hidden"}`}>
      <div
        className={
          "h-full w-full flex-col bg-white dark:bg-slate-800 rounded-lg "
        }
      >
        <div className="flex h-[80%]">
          <video
            className="h-full w-1/2"
            playsInline
            autoPlay
            muted
            ref={ownVideoRef}
          />
          <video
            className="h-full w-1/2"
            playsInline
            autoPlay
            ref={userVideoRef}
          />
        </div>
        <div className="flex space-x-4 px-4 h-[20%]">
          <ToggleVideoButton />
          <ToggleAudioButton />
          <CallButton />
        </div>
      </div>
      <AcceptCallModal />
    </div>
  );
};
