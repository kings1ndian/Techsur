package com.example.resume_matcher.dto.ollama;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OllamaResponse {
    private String model;
    private String response;
    private boolean done;

    // Change from long to String to match the API response format
    @JsonProperty("created_at")
    private String created_at;

    @JsonProperty("total_duration")
    private long total_duration;

    @JsonProperty("load_duration")
    private long load_duration;

    @JsonProperty("prompt_eval_duration")
    private long prompt_eval_duration;

    @JsonProperty("eval_duration")
    private long eval_duration;

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    public long getTotal_duration() {
        return total_duration;
    }

    public void setTotal_duration(long total_duration) {
        this.total_duration = total_duration;
    }

    public long getLoad_duration() {
        return load_duration;
    }

    public void setLoad_duration(long load_duration) {
        this.load_duration = load_duration;
    }

    public long getPrompt_eval_duration() {
        return prompt_eval_duration;
    }

    public void setPrompt_eval_duration(long prompt_eval_duration) {
        this.prompt_eval_duration = prompt_eval_duration;
    }

    public long getEval_duration() {
        return eval_duration;
    }

    public void setEval_duration(long eval_duration) {
        this.eval_duration = eval_duration;
    }
}