"""Service for submission management."""
from typing import Protocol

from submit_api.models import SubmittedDocument as SubmittedDocumentModel
from submit_api.models.db import session_scope
from submit_api.models.submission import Submission as SubmissionModel
from submit_api.models.submission import SubmissionTypeStatus
from submit_api.models.submitted_form import SubmittedForm as SubmittedFormModel


class SubmissionCreatorFactory(Protocol):
    """Submission creator factory protocol."""

    def create(self, item_id, request_data) -> SubmissionModel:
        """Create a new submission."""
        return SubmissionModel()


class FormSubmissionCreator(SubmissionCreatorFactory):
    """Form submission creator."""

    def create(self, item_id, request_data):
        """Create a new form submission."""
        with session_scope() as session:
            submitted_form = self._create_submitted_form(session, request_data)
            submission = self._create_submission(session, item_id, submitted_form.id)
            return submission

    @staticmethod
    def _create_submitted_form(session, request_data):
        """Create a new submitted form."""
        submitted_form = SubmittedFormModel(
            submission_json=request_data
        )
        session.add(submitted_form)
        session.commit()
        session.flush()
        return submitted_form

    @staticmethod
    def _create_submission(session, item_id, submitted_form_id):
        """Create a new submission."""
        previous_submission = SubmissionModel.find_latest_by_type(SubmissionTypeStatus.FORM)
        submission = SubmissionModel(
            item_id=item_id,
            type=SubmissionTypeStatus.FORM,
            submitted_form_id=submitted_form_id,
            version=(previous_submission.version + 1) if previous_submission else 1
        )
        session.add(submission)
        session.commit()
        session.flush()
        return submission


class DocumentSubmissionCreator(SubmissionCreatorFactory):
    """Document submission creator."""

    def create(self, item_id, request_data):
        """Create a new document submission."""
        with session_scope() as session:
            submitted_document = self._create_submitted_document(session, request_data)
            submission = self._create_submission(session, item_id, submitted_document.id)
            return submission

    @staticmethod
    def _create_submitted_document(session, request_data):
        """Create a new submitted document."""
        submitted_document = SubmittedDocumentModel(
            name=request_data.get('name'),
            url=request_data.get('url')
        )
        session.add(submitted_document)
        session.commit()
        session.flush()
        return submitted_document

    @staticmethod
    def _create_submission(session, item_id, submitted_document_id):
        """Create a new submission."""
        previous_submission = SubmissionModel.find_latest_by_type(SubmissionTypeStatus.DOCUMENT)
        submission = SubmissionModel(
            item_id=item_id,
            type=SubmissionTypeStatus.DOCUMENT,
            submitted_document_id=submitted_document_id,
            version=(previous_submission.version + 1) if previous_submission else 1
        )
        session.add(submission)
        session.commit()
        session.flush()
        return submission
