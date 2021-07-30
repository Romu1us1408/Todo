from marshmallow import Schema, fields, validates, ValidationError, validates_schema
from marshmallow.validate import Length


class AccountsSchema(Schema):
    fName = fields.Str(validate=Length(min=4))
    lName = fields.Str(validate=Length(min=4))
    email = fields.Email()
    password = fields.Str(validate=Length(min=8))
    passCom = fields.Str(validate=Length(min=8))

    @validates('password')
    def validate_name(self, input):
        if not any(map(str.isdigit, input)):
            raise ValidationError('must contain at least one digit')


    @validates_schema
    def passwords_match(self, all_data, **kwargs):
        if all_data['password'] != all_data['password2']:
            raise ValidationError('passwords must match')