<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SubscriptionExpiryNotice extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $daysLeft;

    /**
     * Create a new message instance.
     */
    public function __construct($user, $daysLeft)
    {
        $this->user = $user;
        $this->daysLeft = $daysLeft;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Your GymLife subscription is expiring soon')
            ->view('emails.subscription_expiry')
            ->with([
                'user' => $this->user,
                'daysLeft' => $this->daysLeft,
            ]);
    }
}
