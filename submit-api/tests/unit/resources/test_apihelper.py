import pytest
from flask import Flask
from flask_restx import Resource
from submit_api.resources.apihelper import Api

@pytest.fixture(scope="module")
def app(app):
    """defining app test fixture"""
    api = Api(app)
    app.api = api
    return app

def test_specs_url_http(app):
    """Test that the specs_url uses http scheme when port 3200 is in base_url."""
    with app.test_request_context(base_url='http://localhost:3200/'):
        print(app.extensions)
        api = app.api
        # api = Api(app)
        assert api.specs_url == 'http://localhost:3200/swagger.json'

def test_specs_url_https(app):
    """Test that the specs_url uses https scheme when port 3200 is not in base_url."""
    with app.test_request_context(base_url='https://example.com/'):
        # api = Api(app)
        api = app.api
        assert api.specs_url == 'https://example.com/swagger.json'
