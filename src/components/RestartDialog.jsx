import * as Dialog from '@radix-ui/react-dialog';
import '../styles/RestartDialog.scss';

export default function RestartDialog({ gameOutcome, onClick }) {
  return (
    <Dialog.Root open={gameOutcome}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog">
          <Dialog.Title className="dialog__title">Round Complete</Dialog.Title>
          <Dialog.Description className="dialog__desc">{gameOutcome}</Dialog.Description>
          <div className="button-container">
            <Dialog.Close asChild>
              <button className="button button--restart" onClick={onClick}>
                Play again
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
