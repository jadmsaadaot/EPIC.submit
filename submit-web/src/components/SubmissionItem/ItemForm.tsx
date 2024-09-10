import {
  SUBMISSION_ITEM_TYPE,
  SubmissionItem as TypeSubmissionItem,
} from "@/models/SubmissionItem";
import { Case, Default, Switch } from "react-if";
import { ContactInformation } from "./ContactInformation";

type ItemFormProps = {
  submissionItem: TypeSubmissionItem;
};
export const ItemForm = ({ submissionItem }: ItemFormProps) => {
  return (
    <Switch>
      <Case
        condition={
          submissionItem.type.name === SUBMISSION_ITEM_TYPE.CONTACT_INFORMATION
        }
      >
        <ContactInformation />
      </Case>
      <Default>
        <div>Default</div>
      </Default>
    </Switch>
  );
};
