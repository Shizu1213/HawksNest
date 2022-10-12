<?php
    class Database {
        //testingdffsdsdfdf
        const HOST =  'localhost';
        const PORT =  '3306';
        const USERNAME =  'NakamaGames';
        const PASSWORD =  '20221007';
        const DB_NAME =  'hawknestdb';

        function __construct() {
            $this->db = new mysqli(self::HOST, self::USER, self::DATABASE, self::PASS);
            
            if ($this->db>connect_error) {
                $this->dieMessage('username', 'Failed to Connect to Server');
            }
        }

        function nameTaken($username) {
            $statement = $this->db>prepare('SELECT * FROM users WHERE username = ?');
            $statement->blind_param('s', $username);
            $statement->exetute();

            $result = $statement->getresult();

            if ($result->num_rows) {
                return true;
            }
        }

        function CreateUser($username, $email, $password) {
            if ($this->nameTaken($username)) {
                $this->dieMessage('username', "That username is already taken.");
            }
        }
        
        function = $this->hashpassword($password);

        $statement = $this->db('INSERT INTO users (username, email, password') VALUES (?, ?, ?);
        $statement->bind_param('sss', $username, $password, $email);

        if (!$statement->execute()) {
            $this->dieMessage('username, Oops! An error occured. Try Again Later');
        }

            $this->dieMessage('Account Created!', true);
        
        function hashpassword($password) {
            $password = password_hash($password, PASSWORD_BCRYPT);

            return str_replace('$2y$', '$2a$', $password);
        }

        function dieMessage($key, $message) {
            die(json_encode(array($key => $message)));
        }
    }
?>
