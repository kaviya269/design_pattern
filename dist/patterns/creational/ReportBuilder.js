"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportBuilder = void 0;
const Report_1 = require("./Report");
class ReportBuilder {
    constructor() { this.report = new Report_1.Report(); }
    setTitle(title) {
        if (!title)
            throw new Error('Title required');
        this.report.title = title;
        return this;
    }
    setContent(content) {
        if (content == null)
            throw new Error('Content required');
        this.report.content = content;
        return this;
    }
    setAuthor(author) {
        this.report.author = author;
        return this;
    }
    build() {
        if (!this.report.title || !this.report.content)
            throw new Error('Incomplete report');
        this.report.timestamp = new Date();
        return this.report;
    }
}
exports.ReportBuilder = ReportBuilder;
