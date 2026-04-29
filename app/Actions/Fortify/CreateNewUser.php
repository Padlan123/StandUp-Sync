<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     *
     * @throws ValidationException
     */
    public function create(array $input): User
    {
        Validator::make($input, $this->rules(), $this->messages())->validate();

        $member = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
        ]);
        $member->assignRole('member');
        return $member;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'isi nama anda',
            'name.string' => 'nama harus berupa string',
            'name.max' => 'nama tidak boleh lebih dari 255 karakter',
            'email.required' => 'alamat email adalah wajib',
            'email.email' => 'masukkan alamat email yang valid',
            'email.max' => 'alamat email tidak boleh lebih dari 255 karakter',
            'email.unique' => 'alamat email sudah digunakan',
            'password.required' => 'password adalah wajib',
            'password.string' => 'password harus berupa string',
            'password.min' => 'password harus minimal 8 karakter',
            'password.confirmed' => 'konfirmasi password tidak cocok',
        ];
    }
}
