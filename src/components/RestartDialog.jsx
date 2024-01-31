import * as Dialog from '@radix-ui/react-dialog';
import '../styles/RestartDialog.scss';

export default function RestartDialog({ gameOutcome, closeDialog }) {
  return (
    // only show when gameOutcome isn't null
    <Dialog.Root open={gameOutcome}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog" onEscapeKeyDown={closeDialog}>
          <Dialog.Title className="dialog__title">Round Complete</Dialog.Title>
          <Dialog.Description className="dialog__desc">{gameOutcome}</Dialog.Description>
          <div className="button-container">
            <Dialog.Close asChild>
              <button className="button button--restart" onClick={closeDialog}>
                Play again
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
