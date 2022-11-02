<?php
class Confirmer {
        const PASSWORD_COMBOS = '/[^A-Za-z0-9!@#$%^&*()_+\-=\[\]{};\':"\\\\|,.<>\/?`~ ]/';

        private $name;
        private $label;
        private field;
        private error;

        private errors = [];
        private $messages = [
            'missing' => 'Please fill in a valid %s',
            'notenough' => '%s must be at least $s characters',
            'toomuch' => '%s must not go over $s characters'
            'nomatch' => '$s does not match $s'
        ]

        function name($name, $label) {
            $this->name = $name;
            $this->label = $label;
        }
