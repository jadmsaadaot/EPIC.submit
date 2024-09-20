"""Service for submission management."""

from submit_api.models.submission import Submission as SubmissionModel
from submit_api.models.submission import SubmissionTypeStatus
from submit_api.services.submission.submission_creator_factory import FormSubmissionCreator, SubmissionCreatorFactory, \
    DocumentSubmissionCreator


class SubmissionService:
    """Submission management service."""

    @classmethod
    def make_submission_creator(cls, submission_type) -> SubmissionCreatorFactory:
        """Make a new submission creator."""
        if not submission_type:
            raise ValueError("Submission type is required.")

        submission_creators = {
            SubmissionTypeStatus.FORM.value: FormSubmissionCreator(),
            SubmissionTypeStatus.DOCUMENT.value: DocumentSubmissionCreator()
        }
        submission_creator = submission_creators.get(submission_type)
        if not submission_creator:
            raise ValueError(f"Submission type {submission_type} is not supported.")
        return submission_creator

    @classmethod
    def get_submission_by_id(cls, submission_id):
        """Get submission by id."""
        submission = SubmissionModel.find_by_id(submission_id)
        return submission

    @classmethod
    def create_submission(cls, item_id, request_data):
        """Create a new submission."""
        submission_type = request_data.get("type")
        if not submission_type:
            raise ValueError("Submission type is required.")

        submission_creator = cls.make_submission_creator(submission_type)
        submission_data = request_data.get("data")
        return submission_creator.create(item_id, submission_data)
