import { Dispatch, SetStateAction } from "react";

import { Modal, Text } from "@/shared/components";

export interface CreateCompanyModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const CreateCompanyModal: React.FC<CreateCompanyModalProps> = (
  props,
) => {
  const { showModal, setShowModal } = props;

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className="inline-block w-full transform overflow-hidden bg-white px-4 py-6 align-middle transition-all sm:max-w-md sm:rounded-2xl sm:border sm:border-gray-200 sm:py-10 sm:px-6">
        <Text.H1>Crear empresa</Text.H1>
      </div>
    </Modal>
  );
};
