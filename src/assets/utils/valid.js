import intl from 'react-intl-universal'

export function validPhone(rule, value, callback) {
  if (value === "" || value === undefined) {
    callback(intl.get('Login.valid1'))
  } else if (!/^[0-9]*$/.test(value)) {
    callback(intl.get('Login.valid2'))
  } else {
    callback()
  }
}
export function validEmail(rule, value, callback) {
  if (value === "" || value === undefined) {
    callback(intl.get('Login.valid3'))
  } else if (! /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)) {
    callback(intl.get('Login.valid4'))
  } else {
    callback()
  }
}
export function validUpwd(rule, value, callback) {
  if (value === "" || value === undefined) {
    callback(intl.get('Login.valid5'))
  } else if (!/^([a-z0-9.@!#$%^&*()]){6,20}$/i.test(value)) {
    callback(intl.get('Login.valid6'));
  } else {
    callback();
  }
};